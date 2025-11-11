import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { TaskItem } from '../../lib/models/task-item';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TaskService] });
    service = TestBed.inject(TaskService);
  });

  it('should have initial task items', () => {
    const items = service.items();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].title).toBe('Angular Kurs absolvieren');
  });

  it('should get task by id', () => {
    const item = service.items()[0];
    const found = service.getTask(item.id);
    expect(found).toEqual(item);
  });

  it('should return undefined for unknown id', () => {
    const found = service.getTask('unknown-id');
    expect(found).toBeUndefined();
  });

  it('should return undefined for empty id', () => {
    const found = service.getTask('');
    expect(found).toBeUndefined();
  });

  it('should add a task with correct defaults', () => {
    const newTask = {
      id: '1',
      title: 'Test Task',
      priority: 'default',
      dueDate: new Date(),
      labels: ['test'],
      completed: false,
    } as TaskItem;

    service.addTask(newTask);

    const items = service.items();
    const added = items.find((t) => t.title === 'Test Task');
    expect(added).toBeDefined();
    expect(added?.completed).toBeFalse();
    expect(added?.id).toBeDefined();
    expect(added?.priority).toBe('default');
  });

  it('should update an existing task partially', () => {
    const item = service.items()[0];
    service.updateTask(item.id, { completed: true, priority: 'important' });

    const updated = service.getTask(item.id);
    expect(updated).toBeDefined();
    expect(updated?.completed).toBeTrue();
    expect(updated?.priority).toBe('important');
    expect(updated?.title).toBe(item.title); // unchanged
  });

  it('should do nothing when updating a nonexistent task', () => {
    const before = [...service.items()];
    service.updateTask('nonexistent-id', { completed: true });
    const after = service.items();
    expect(after).toEqual(before);
  });

  it('should remove a task by id', () => {
    const item = service.items()[0];
    service.removeTask(item.id);

    const found = service.getTask(item.id);
    expect(found).toBeUndefined();
  });

  it('should do nothing when removing a nonexistent id', () => {
    const before = [...service.items()];
    service.removeTask('nonexistent-id');
    const after = service.items();
    expect(after).toEqual(before);
  });
});
