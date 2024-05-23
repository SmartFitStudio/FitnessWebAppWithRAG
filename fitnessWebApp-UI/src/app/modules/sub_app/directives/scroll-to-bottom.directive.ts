import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
  standalone: true
})
export class ScrollToBottomDirective {
  @Input() appScrollToBottom!: boolean;
  lastST = 0;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(){
    this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
  }

  ngAfterViewChecked(){
    if (this.appScrollToBottom) {
      let sT = this.el.nativeElement.scrollTop;
      let cH = this.el.nativeElement.clientHeight;
      let sH = this.el.nativeElement.scrollHeight;
      const lastElementChild = this.el.nativeElement.lastElementChild;
      if (lastElementChild) {
        if (lastElementChild.querySelector('.chatbot-response')) {
          if(sT+cH >= sH-50 && sT+cH <= sH+50 && this.lastST<=sT){
            this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
            this.lastST = sT;
          }
        } else {
          this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
        }
      }
    }
  }


}
