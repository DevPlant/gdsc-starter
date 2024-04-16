import { HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';

export function download(event: HttpResponse<Blob>, altName?: string) {
    const contentDisposition = event.headers.get('Content-Disposition');
    let fileName;
    try {
        fileName = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : undefined;
    } catch (e) {
        console.log('Failed to parse content-disposition: ', contentDisposition);
    }

    saveAs(event.body as Blob, fileName ? fileName : altName);
}
