import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PetRegistrationDialogComponent} from "./pet-registration-dialog.component";

describe('PetRegistrationDialogComponent', () => {
  let component: PetRegistrationDialogComponent;
  let fixture: ComponentFixture<PetRegistrationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetRegistrationDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
