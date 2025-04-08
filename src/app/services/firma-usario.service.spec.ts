import { TestBed } from '@angular/core/testing';

import { FirmaUsarioService } from './firma-usario.service';

describe('FirmaUsarioService', () => {
  let service: FirmaUsarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmaUsarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
