import { Component, OnInit, Input, ElementRef, forwardRef, ViewChild, NgZone, Injector, AfterViewInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../lib/value-accessor';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true
    }
  ]
})
export class FileInputComponent extends ValueAccessor implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    protected zone: NgZone,
    protected injector: Injector,
    protected el: ElementRef
  ) {
    super(zone, injector, el);
  }

  file: File | null = null;
  imageUrl: string = null;

  accept: string;

  @Input() progress;
  @Input() raiseIonStyle = false;

  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>;

  async ngOnInit(): Promise<void> {
    this.accept = 'image/jpeg, image/png, image/gif';

    const event = new CustomEvent('ionStyle', {
      bubbles: true,
      detail: {
        interactive: true,
        input: true,
      }
    });
    this.el.nativeElement.dispatchEvent(event);
  }

  writeValueImpl(value: any) {
    if (value) {
      this.setFile(value);
    } else {
      this.clearFile();
    }
  }

  setDisabledState(isDisabled: boolean) {
    // TODO: implement
  }

  onBrowseClick() {
    this.input.nativeElement.click();
    this.onTouched();
  }

  onClear() {
    this.clearFile();

    this.onChange(this.file);
  }

  async onFileChange(event: any): Promise<void> {
    const file: File = event && event.target.files[0];

    const result = await this.setFile(file);

    this.onChange(this.file);

    return result;
  }

  private async setFile(file: File): Promise<void> {
    this.file = file;
    this.imageUrl = await this.fileToBase64Uri(this.file);

    return Promise.resolve();
  }

  private clearFile(): void {
    // clear file input
    this.file = null;
    this.imageUrl = null;

    // clear the input selections
    this.input.nativeElement.files = null;
    this.input.nativeElement.value = null;

  }

  fileToBase64Uri(fileImage: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result as string);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

}
