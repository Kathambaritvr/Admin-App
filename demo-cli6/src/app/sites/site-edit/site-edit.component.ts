import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../site.service';
import { Site } from '../site';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Topic } from 'src/app/topics/topic';
import { TopicService } from 'src/app/topics/topic.service';

@Component({
    selector: 'site-edit',
    templateUrl: './site-edit.component.html'
})
export class SiteEditComponent implements OnInit {

    id: string;
    site: Site;
    errors: string;
    topics: Topic[];
    flag : boolean;

    constructor(
        private route: ActivatedRoute,
        private topicService: TopicService,
        private siteService: SiteService) {
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                   this.topicService.getTopicList().subscribe(
                                result => {
                                this.topics = result;
                            },
                               err => {
                                console.log(JSON.stringify(err));
                                console.error('error loading', err);
                            }
                        );
                        if (id === 'new') {
                            this.flag = true;
                            
                            return of(new Site(new Topic()));
                    }
                    else {
                        this.flag = false;
                        return this.siteService.findById(id);
                    }
                })
            )
             .subscribe(
                site => {
                    console.log("site:" + JSON.stringify(site));
                    this.site = site;
                    this.errors = '';
                },
                err => {
                    this.errors = 'Error loading';
                }
            );
    }

    create() {
        this.siteService.create(this.site).subscribe(
            site => {
                this.site = site;
                this.errors = 'Save was successful!';
            },
            err => {
                this.errors = 'Error saving';
            }
        );
    }

    save() {
        this.siteService.save(this.site).subscribe(
            site => {
                this.site = site;
                this.errors = 'Save was successful!';
            },
            err => {
                this.errors = 'Error saving';
            }
        );
    }
}