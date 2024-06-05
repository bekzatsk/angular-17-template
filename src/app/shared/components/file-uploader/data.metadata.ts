import {Subscription} from "rxjs";

export interface FileUploadData {
  file: File;
  isUploading: boolean;
  isUploaded: boolean;
  isSuccess: boolean;
  isReady: boolean;
  isError: boolean;
  isCancel: boolean;
  progress: number | null;
  nameWithoutExtension?: string | null;
  uploadSub?: Subscription | null;
  data64?: string | null;
}
