/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { LoaderServiceService } from './loader-service.service';

describe('Service: LoaderService', () => {
  beforeEach(() => {
    addProviders([LoaderServiceService]);
  });

  it('should ...',
    inject([LoaderServiceService],
      (service: LoaderServiceService) => {
        expect(service).toBeTruthy();
      }));
});
