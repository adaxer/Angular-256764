import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskQuickComponent } from './task-quick.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('TaskQuickComponent', () => {
  let component: TaskQuickComponent;
  let fixture: ComponentFixture<TaskQuickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskQuickComponent],
      imports: [FormsModule], // Notwendig fuer [ngModel]
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
