import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstoreAppComponent } from './bookstore-app.component';

describe('BookstoreAppComponent', () => {
  let component: BookstoreAppComponent;
  let fixture: ComponentFixture<BookstoreAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookstoreAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookstoreAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
