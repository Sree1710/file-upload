import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../file.service';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  public formGroup = new FormGroup({
    file: new FormControl('', Validators.required)
  });


  private fileName="";
  getFileName="";
  

  constructor(private fb: FormBuilder, private fileService: FileService) { }
  public onFileChange(event:any) {
    const reader = new FileReader();
    
    console.log(this.formGroup.get('file'));
 
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.formGroup.patchValue({
          [file]: reader.result
        });
      };
    }
  }
 
  public onSubmit(): void {
    this.fileService.upload(this.fileName, this.getFileName);
  }
  ngOnInit(): void {
  }

}
