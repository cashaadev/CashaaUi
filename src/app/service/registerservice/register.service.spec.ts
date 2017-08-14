/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { RegisterService } from './register.service';

describe('Service: Register', () => {
  beforeEach(() => {
    addProviders([RegisterService]);
  });

  it('should ...',
    inject([RegisterService],
      (service: RegisterService) => {
        expect(service).toBeTruthy();
      }));
});
