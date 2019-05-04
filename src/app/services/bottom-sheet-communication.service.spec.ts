import {TestBed} from "@angular/core/testing";

import {BottomSheetCommunicationService} from "./bottom-sheet-communication.service";

describe('BottomSheetCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BottomSheetCommunicationService = TestBed.get(BottomSheetCommunicationService);
    expect(service).toBeTruthy();
  });
});
