import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { TaskRemoteService } from '../../services/task-remote.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TaskItem } from '../../../lib/models/task-item';
import { RelativeDatePipe } from '../../pipes/relative-date.pipe';

// Dummy component for <app-task-quick>
@Component({
  selector: 'app-task-quick',
  template: `<ng-content></ng-content>`,
})
class TaskQuickStubComponent {
  @Input() task!: TaskItem;
}

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskRemoteService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const testTask: TaskItem = {
    id: '42',
    title: 'Test Task',
    priority: 'important',
    dueDate: new Date('2025-12-31'),
    completed: false,
    labels: ['label1', 'label2'],
  };

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskRemoteService', [
      'updateTask',
      'removeTask',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [
        TaskItemComponent,
        TaskQuickStubComponent,
        RelativeDatePipe,
      ],
      providers: [
        { provide: TaskRemoteService, useValue: taskServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.item = testTask;
    fixture.detectChanges();
  });

  it('should create component and render task title and labels', () => {
    expect(component).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    // Title text present
    expect(compiled.querySelector('.title')?.textContent).toContain(
      testTask.title
    );

    // Labels rendered with correct text
    const labelElements = compiled.querySelectorAll('.label');
    expect(labelElements.length).toBe(testTask.labels!.length);
    expect(labelElements[0].textContent).toBe('label1');
    expect(labelElements[1].textContent).toBe('label2');
  });

  it('should apply priority as CSS class and line-through style when completed', () => {
    const titleSpan = fixture.nativeElement.querySelector(
      '.title'
    ) as HTMLElement;

    // completed false setzen und Change Detection triggern
    component.item.completed = false;
    fixture.detectChanges();

    expect(titleSpan.classList).toContain(testTask.priority);
    // Erwartung zu Beginn: kein line-through
    expect(window.getComputedStyle(titleSpan).textDecorationLine).not.toBe(
      'line-through'
    );

    // completed true setzen und Change Detection triggern
    component.item.completed = true;
    fixture.detectChanges();

    // Computed Style prüfen
    expect(window.getComputedStyle(titleSpan).textDecorationLine).toBe(
      'line-through'
    );
  });

  it('should have checkbox checked based on completed property', () => {
    const checkbox = fixture.nativeElement.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(testTask.completed);

    // Update completed and check checkbox
    component.item.completed = true;
    fixture.detectChanges();
    expect(checkbox.checked).toBeTrue();
  });

  it('should call setCompleted with opposite of current completed when checkbox changes', () => {
    spyOn(component, 'setCompleted').and.callThrough();

    // completed false setzen und Change Detection triggern
    component.item.completed = false;
    fixture.detectChanges();

    const checkboxDebug = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    );

    // Das Kontrollkästchen hat initial completed = false;
    // Wir simulieren eine Änderung zum checked = true

    // Wichtig: Angular liest typischerweise $event.target.checked
    checkboxDebug.triggerEventHandler('change', { target: { checked: true } });

    expect(component.setCompleted).toHaveBeenCalledWith(true);
    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(testTask.id, {
      completed: true,
    });
  });

  it('should call router.navigate with correct url on editTask', () => {
    component.editTask(testTask.id);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/edit', testTask.id]);
  });

  it('should call taskService.removeTask with correct id on deleteTask', () => {
    component.deleteTask(testTask.id);
    expect(taskServiceSpy.removeTask).toHaveBeenCalledWith(testTask.id);
  });
});
