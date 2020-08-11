import { ControlValueAccessor, NgControl } from '@angular/forms';
import { AfterViewInit, OnDestroy, Injector, ElementRef, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class ValueAccessor implements ControlValueAccessor, AfterViewInit, OnDestroy {

    private statusChanges?: Subscription;

    constructor(
        protected zone: NgZone,
        protected injector: Injector,
        protected el: ElementRef
    ) { }

    onChange: (value: any) => void = () => {/**/ };
    onTouched: () => void = () => {/**/ };

    writeValue(value: any) {
        this.writeValueImpl(value);
        this.setIonicClasses(this.el);
    }

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    abstract setDisabledState(isDisabled: boolean);

    abstract writeValueImpl(value: any);

    ngOnDestroy() {
        if (this.statusChanges) {
            this.statusChanges.unsubscribe();
        }
    }

    ngAfterViewInit() {
        let ngControl;
        try {
            ngControl = this.injector.get<NgControl>(NgControl); // as Type<NgControl>);
        } catch { /* No FormControl or ngModel binding */ }

        if (!ngControl) { return; }

        // Listen for changes in validity, disabled, or pending states
        if (ngControl.statusChanges) {
            this.statusChanges = ngControl.statusChanges.subscribe(() => this.setIonicClasses(this.el));
        }

        /**
         * TODO Remove this in favor of https://github.com/angular/angular/issues/10887
         * whenever it is implemented. Currently, Ionic's form status classes
         * do not react to changes when developers manually call
         * Angular form control methods such as markAsTouched.
         * This results in Ionic's form status classes being out
         * of sync with the ng form status classes.
         * This patches the methods to manually sync
         * the classes until this feature is implemented in Angular.
         */
        const formControl = ngControl.control;
        if (formControl) {
            const methodsToPatch = ['markAsTouched', 'markAllAsTouched', 'markAsUntouched', 'markAsDirty', 'markAsPristine'];
            methodsToPatch.forEach(method => {
                if (formControl[method]) {
                    const oldFn = formControl[method].bind(formControl);
                    formControl[method] = (...params) => {
                        oldFn(...params);
                        this.setIonicClasses(this.el);
                    };
                }
            });
        }
    }

    setIonicClasses(element: ElementRef) {
        setTimeout(() => {
            const input = element.nativeElement as HTMLElement;
            const classes = this.getClasses(input);
            this.setClasses(input, classes);

            const item = input.closest('ion-item');
            if (item) {
                this.setClasses(item, classes);
            }
        });
    }

    private getClasses(element: HTMLElement) {
        const classList = element.classList;
        const classes = [];
        for (let i = 0; i < classList.length; i++) {
            const item = classList.item(i);
            if (item !== null && this.startsWith(item, 'ng-')) {
                classes.push(`ion-${item.substr(3)}`);
            }
        }
        return classes;
    }

    private setClasses(element: HTMLElement, classes: string[]) {
        const classList = element.classList;
        [
            'ion-valid',
            'ion-invalid',
            'ion-touched',
            'ion-untouched',
            'ion-dirty',
            'ion-pristine'
        ].forEach(c => classList.remove(c));

        classes.forEach(c => classList.add(c));
    }

    private startsWith(input: string, search: string): boolean {
        return input.substr(0, search.length) === search;
    }

}


