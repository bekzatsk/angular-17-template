import {Component, OnDestroy, OnInit} from '@angular/core';
import {IconsModule} from "../../../../shared/modules/icons.module";
import {AbstractEditComponent} from "../../../../shared/components/abstract-components/abstract-edit.component";
import {environment} from "../../../../../environments/environment";
import {lastValueFrom,} from "rxjs";
import {NgClass} from "@angular/common";
import {FormArray, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {maxLengthArray, minLengthArray} from "../../../../shared/data/reactive-custom-validators";
import {FileUploaderComponent} from "../../../../shared/components/file-uploader/file-uploader.component";


@Component({
  selector: 'app-release-page',
  standalone: true,
  imports: [
    IconsModule,
    NgClass,
    ReactiveFormsModule,
    FileUploaderComponent
  ],
  templateUrl: './release-page.component.html',
  styleUrl: './release-page.component.scss'
})
export class ReleasePageComponent  extends AbstractEditComponent implements OnInit, OnDestroy {
  override getRecordUrl = `${environment.apiUrl}/app/albumreleases`;
  override postRecordUrl = `${environment.apiUrl}/app/albumreleases`;
  genres: any[] = [];
  trackVersions: any[] = [];
  languages: any[] = [];
  creditRoles: any[] = [];
  stores: any[] = [];
  regions: any[] = [];
  step = 1;
  activeTrackIndex: number | null = null;

  firstStepForm = this.fb.group({
    releaseName: ['', [Validators.required]],
    coverArt: [''],
    tracks: this.fb.array([], [minLengthArray(1)]),
    status: ['DRAFT']
  });
  firstStepValid = 0;

  secondStepForm = this.fb.group({
    mainArtists: [[{}], [minLengthArray(1)]],
    recordLabel: [''],
    genres: [[''], [minLengthArray(1), maxLengthArray(2)]]
  });
  thirdStepForm = this.fb.group({
    releaseDate: [null, [Validators.required]],
    previouslyReleasedDate: [null],
    stores: [['']],
    regions: [['']],
    upcean: ['']
  });

  constructor() {
    super();
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit().then(() => {});

    lastValueFrom(this.http.get(`${environment.apiUrl}/app/data/genres/popular`)).then((r: any) => {
      this.genres = r;
      this.checkLoading('genre');
    });

    lastValueFrom(this.http.get(`${environment.apiUrl}/app/data/stores`)).then((r: any) => {
      this.stores = [{id: null, name: 'All Stores'}, ...r];
      this.checkLoading('store');
    });

    lastValueFrom(this.http.get(`${environment.apiUrl}/app/data/regions`)).then((r: any) => {
      this.regions = [{id: null, name: 'All Regions'}, ...r];
      this.checkLoading('region');
    });

    lastValueFrom(this.http.get(`${environment.apiUrl}/app/data/track-versions`)).then((r: any) => {
      this.trackVersions = r;
      this.checkLoading('trackVersion');
    });

    lastValueFrom(this.http.get(`${environment.apiUrl}/app/data/languages`)).then((r: any) => {
      this.languages = r;
      this.checkLoading('language');
    });

    lastValueFrom(this.http.get(`${environment.apiUrl}/app/data/music-roles`)).then((r: any) => {
      this.creditRoles = r;
      this.checkLoading('creditRole');
    });
  }

  ngOnDestroy() {

  }

  get firstCtrl() {
    return this.firstStepForm.controls;
  }

  get tracks() {
    return this.firstCtrl.tracks as FormArray;
  }

  toStep(index: number) {
    this.step = index;
    // this.statusAudio = 'pause';
    // if (index > 3) {
    //   this.activeTrackIndex = index - 4;
    //   this.startOn = this.timeConverter.to(this.range[this.activeTrackIndex][0] / 1000).substring(3);
    //   this.setCurrentAudio();
    // }
  }

  addTrack(track: any) {
    const tracks = this.firstStepForm.get('tracks') as FormArray;
    tracks.push(this.fb.group({
      id: [track?.id],
      fileId: [track?.fileId, [Validators.required]],
      name: [track?.name, [Validators.required]],
      version: [track?.version ?? '00000000-0000-0000-0000-000000000000'],
      instrumental: [track?.instrumental, [Validators.required]],
      explicit: [track?.explicit, [Validators.required]],
      lyrics: [track?.lyrics],
      lyricsTTML: [null],
      language: [track?.language, [Validators.required]],
      isrc: [track?.isrc],
      collaborators: this.fb.array([]),
      songwriters: this.fb.array([]),
      owners: this.fb.array([], [Validators.required]),
      credits: this.fb.array([]),
      audioPreview: [track?.audioPreview ?? 0, [Validators.required]],
      copyright: [track?.copyright ?? 1, [Validators.required]],
      copyrightAttachment: this.fb.group({
        id: [track?.copyrightAttachment?.id],
        name: [track?.copyrightAttachment?.name]
      }),
    }));
  }

  get currentTrack() {
    return this.activeTrackIndex != null ? (this.tracks.controls.at(this.activeTrackIndex) as FormGroup) : null;
  }

  get secondCtrl() {
    return this.secondStepForm.controls;
  }

  get thirdCtrl() {
    return this.thirdStepForm.controls;
  }

  get collaborators() {
    return this.activeTrackIndex != null ? (this.tracks.controls.at(this.activeTrackIndex) as FormGroup).controls['collaborators'] as FormArray : null;
  }
}
