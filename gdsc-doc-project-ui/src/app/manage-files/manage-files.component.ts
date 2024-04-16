import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {download} from "../utils/file-download-utils";

export interface File {
  id: number;
  name: string;
}

@Component({
  selector: 'app-manage-files',
  templateUrl: './manage-files.component.html',
  styleUrl: './manage-files.component.scss'
})
export class ManageFilesComponent implements OnInit {

  public files: File[] = [];

  constructor(private http: HttpClient) {

  }


  async onFileSelected(event: any) {

    const file = event.target.files[0] as Blob;

    if (file) {

      const formData = new FormData();

      formData.append("file", file);

      await firstValueFrom(this.http.post("http://localhost:3000/files/upload", formData))
      await this.loadFiles();
    }
  }

  async ngOnInit(): Promise<void> {
    await this.loadFiles();
  }

  async loadFiles(){
    this.files = await firstValueFrom(this.http.get<File[]>("http://localhost:3000/files"));
  }

  async deleteFile(id: number) {
    await firstValueFrom(this.http.delete<void>(`http://localhost:3000/files/${id}`));
    await this.loadFiles();
  }

  async downloadFile(file: File) {
    const data = await firstValueFrom(this.http.get(`http://localhost:3000/files/${file.id}/download`,  {
      responseType: 'blob',
      observe: 'response',
    }));
    download(data, file.name);
  }
}
