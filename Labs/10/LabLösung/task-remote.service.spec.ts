import { TestBed } from '@angular/core/testing';

import { TaskRemoteService } from './task-remote.service';
import { provideHttpClient } from '@angular/common/http';

describe('TaskRemoteService', () => {
  let service: TaskRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TaskRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
