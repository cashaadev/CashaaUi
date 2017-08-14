/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ValidationmessageserviceService } from './validationmessageservice.service';

describe('Service: Validationmessageservice', () => {
  beforeEach(() => {
    addProviders([ValidationmessageserviceService]);
  });

  it('should ...',
    inject([ValidationmessageserviceService],
      (service: ValidationmessageserviceService) => {
        expect(service).toBeTruthy();
      }));
});
