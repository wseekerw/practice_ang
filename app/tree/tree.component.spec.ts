import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TreeComponent } from './tree.component';
import { FormsModule } from '@angular/forms';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let folderCreate;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ TreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should have addFoler function', () => {
    expect(component.addFolder).toBeTruthy();
  });

  it('should have addFile function', () => {
    expect(component.addFile).toBeTruthy();
  }); 

  it('should create folder and return folder error', () => {
    component.folderName = "Folder_1";
    component.addFolder();
    component.folderName = "Folder_1";
    component.addFolder();
    expect(component.folderError).toEqual("Folder with this name already exists");
    expect(component.tree.length).toEqual(1);
  
  });

  it('should create a file and return file error', () => {
    component.folderName = "Folder_1";
    component.addFolder();

    component.folderNameSearch = "Folder_1";
    component.fileName = "File_1";
    component.addFile();

    component.folderNameSearch = "Folder_1";
    component.fileName = "File_1";
    component.addFile();

    expect(component.fileError).toEqual('File with that name already exists');
    expect(component.tree[0].files.length).toEqual(1);    
    expect(component.tree[0].files[0].name).toEqual("File_1"); 
  });


});
