import { Component, OnInit } from '@angular/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { WebDriverLogger } from 'blocking-proxy/built/lib/webdriver_logger';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
 
  // Add folder variables
  folderName: string;
  folderError: string;
  folderSearchError: string;
  fileError: string;
  
  // Other variables
  posts = [];
  getRequest: any;
  username: string;
  password: string;

  checkFolder = nameParam => this.tree.some(({name}) => name == nameParam)
  
  // Add file variables
  folderNameSearch: string;
  fileName: string;
  user: string;
  tree = [];
  files = [];
  
  constructor(private _postsService: PostsService) { } 

  ngOnInit() {
      //this.posts = this._postsService.getPosts() 
      //console.log(this.posts)
      this.getRequest = this._postsService.getPosts().subscribe(data => {
      //this.posts = data.body;
      //console.log(data);
      this._postsService.cast.subscribe(user => this.user = user)
    });
    

    localStorage.setItem('dataSource', '5');
    //console.log(localStorage.getItem('dataSource'));

   
  }

  addFolder(){   

    if(this.checkFolder(this.folderName)===false) {  
      // Reset the folder error if folder is created
      this.folderError = '';
      this.tree.push(
        {
          name: this.folderName,
          type: 'folder',
          files: []
        }
      )
      
    } else {
      this.folderError = 'Folder with this name already exists'
      //console.log('Folder with this name already exists');
    }
         
    //console.log(this.folderName, this.tree)
    this.folderName = '';
    
  };

  addFile() {
    //console.log(this.fileName, this.folderNameSearch)
    
    for (let folder of this.tree) {

      if(folder.name === this.folderNameSearch && this.files.indexOf(this.fileName) === -1) {
        folder.files.push({
          name: this.fileName,
          type: 'file'
        })
        this.fileError = '';
        this.folderSearchError = ''; 
        break;   // If the file is pushed to folder, stop the loop
      } else if (this.files.indexOf(this.fileName) !== -1) {
        this.fileError = 'File with that name already exists';
        this.folderSearchError = "";
      } else {
        this.folderSearchError = "Folder with that name doesnt exist";
        this.fileError = "";
      }
    }

    this.fileName = '';
    this.folderNameSearch = '';
    
    // Update the list of existing files
    for(let j of this.tree) {
      for(let k of j.files) {
          if(this.files.indexOf(k.name) < 0)
          this.files.push(k.name)
      }
    }
    //console.log(this.files, this.tree);
  }

  login() {
    console.log(this.username, this.password);
    this._postsService.makeLogin(this.username, this.password).subscribe(data => {
      console.log(data);
    },
    (err) => {console.log(err)}
    );
  }

  ngOnDestroy() {
    this.getRequest.unsubscribe();    
  }

}
