import { TestBed } from '@angular/core/testing';

import { DataCocherasService } from './data-cocheras.service';

describe('DataCocherasService', () => {
  let service: DataCocherasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCocherasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
