import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let comp: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(comp).toBeTruthy();
  }));

  it('should show h1 text "Please enter your details"', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain("Please enter your details");
  }));

  it('#onSubmit() should set #submitted to true', async(() => {
    expect(comp.submitted).toBe(false, 'false at first');

    comp.onSubmit();

    expect(comp.submitted).toBeTruthy();
  }));

  it('model should match input #onSubmit()', async(() => {
    comp.email.setValue('tester@bot.com');
    comp.password.setValue('123123');

    comp.onSubmit();

    expect(comp.model.email).toEqual('tester@bot.com');
    expect(comp.model.password).toEqual('123123');
  }));

  it('empty form should be invalid', async(() => {
    comp.email.setValue('');
    comp.password.setValue('');

    expect(comp.userForm.invalid).toBeTruthy();
  }));

  it('filled form should be valid', async(() => {
    comp.email.setValue('tester@bot.com');
    comp.password.setValue('123123');

    expect(comp.userForm.valid).toBeTruthy();
  }));

  describe('email', () => {
    it('should be required', async(() => {
      expect(comp.email.errors['required']).toBeDefined();

      comp.email.setValue('a');

      expect(comp.email.errors['required']).toBeUndefined();
    }));

    it('"example.com" should be invalid', async(() => {
      comp.email.setValue('example.com');

      expect(comp.email.valid).toBeFalsy();
    }));

    it('"example @hotmail.com" should be invalid', async(() => {
      comp.email.setValue('example @hotmail.com');

      expect(comp.email.valid).toBeFalsy();
    }));

    it('"test@example.com.au" should be valid', async(() => {
      comp.email.setValue('test@example.com.au');

      expect(comp.email.valid).toBeTruthy();
    }));

  });

  describe('password', () => {
    it('should be required', async(() => {
      expect(comp.password.errors['required']).toBeDefined();

      comp.password.setValue('a');

      expect(comp.password.errors['required']).toBeUndefined();
    }));

    it('should be at least 6 characters', async(() => {
      comp.password.setValue('1234');

      expect(comp.password.errors['minlength']).toBeDefined();

      comp.password.setValue('123456');

      expect(comp.password.valid).toBeTruthy();
    }));
  });
});
