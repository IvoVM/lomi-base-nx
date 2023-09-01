import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductUploaderComponent } from './product-uploader.component';

describe('ProductUploaderComponent', () => {
  let component: ProductUploaderComponent;
  let fixture: ComponentFixture<ProductUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUploaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
