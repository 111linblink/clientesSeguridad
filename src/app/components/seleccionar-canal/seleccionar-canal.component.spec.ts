import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCanalComponent } from './seleccionar-canal.component';

describe('SeleccionarCanalComponent', () => {
  let component: SeleccionarCanalComponent;
  let fixture: ComponentFixture<SeleccionarCanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarCanalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarCanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
