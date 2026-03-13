import { ComponentFixture, TestBed } from '@angular/core/testing';

export class JobDetails {
}

describe('JobDetails', () => {
  let component: JobDetails;
  let fixture: ComponentFixture<JobDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
