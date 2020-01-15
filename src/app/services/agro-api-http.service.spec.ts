import { TestBed } from '@angular/core/testing';

import { AgroApiHttpService } from './agro-api-http.service';

describe('AgroApiHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgroApiHttpService = TestBed.get(AgroApiHttpService);
    expect(service).toBeTruthy();
  });
});
