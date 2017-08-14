/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SharedService } from './shared.service';

describe('Service: Shared', () => {
  beforeEach(() => {
    addProviders([SharedService]);
  });

  it('should ...',
    inject([SharedService],
      (service: SharedService) => {
        expect(service).toBeTruthy();
      }));
});
