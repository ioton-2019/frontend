import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PetTrackingMapComponent} from "./pet-tracking-map.component";

describe('PetTrackingMapComponent', () => {
  let component: PetTrackingMapComponent;
  let fixture: ComponentFixture<PetTrackingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetTrackingMapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetTrackingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
