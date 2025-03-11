import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add task without text', () => {
    component.newTask = '';
    component.dueDate = '2025-01-22';
    component.addTask();
    expect(component.tasks.length).toBe(0);
    expect(component.showError).toBe(true);
    expect(component.errorMessage).toBe('El nombre de la tarea es requerido');
  });

  it('should not add task without date', () => {
    component.newTask = 'Test Task';
    component.dueDate = '';
    component.addTask();
    expect(component.tasks.length).toBe(0);
    expect(component.showError).toBe(true);
    expect(component.errorMessage).toBe('La fecha de entrega es requerida');
  });

  it('should add valid task', () => {
    component.newTask = 'Test Task';
    component.dueDate = '2025-01-22';
    component.addTask();
    expect(component.tasks.length).toBe(1);
    expect(component.showError).toBe(false);
  });
});