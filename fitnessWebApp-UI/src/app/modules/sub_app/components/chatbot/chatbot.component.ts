import { Component, TemplateRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RagllmService } from '../../../../services/services/ragllm.service';
import { ConversationMessage } from '../../services/models/conversationMessage';
import { ScrollToBottomDirective } from '../../directives/scroll-to-bottom.directive';
import * as Showdown from 'showdown';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, ScrollToBottomDirective, SafeHtmlPipe],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages!: ConversationMessage[];
  converter!: Showdown.Converter;
  promptForm!: FormGroup;

  constructor(private ragllmService: RagllmService,
     private offcanvasService: NgbOffcanvas) { }

  ngOnInit() {
    this.messages=[];
    this.converter=new Showdown.Converter();
    this.promptForm = new FormGroup({
      userPrompt: new FormControl('')
    });
  }


  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end'});
	}

  onSubmit() {
    const promptValue = this.userPrompt?.value;
    if(promptValue) {
      this.promptForm.disable();
      this.messages.push({userPrompt: promptValue.trim(), chatbotResponse: ''});
      const subscription$ = this.ragllmService.answerQuestion({body: {question: promptValue.trim()}}).subscribe({
          next: async ragllmResponse => {
              let temp = "";
              for (const char of ragllmResponse.response.toString()) {
                temp += char;
                this.messages[this.messages.length-1].chatbotResponse = this.converter.makeHtml(temp);
                await this.sleep(2);
              }
              this.promptForm.enable();
          },
          error: error => {
            this.promptForm.enable();
            this.messages[this.messages.length-1].chatbotResponse = this.converter.makeHtml(error.error.businessErrorDescription);
          },
          complete: () => {
            subscription$.unsubscribe();
          }
          }
        );
      }
    this.promptForm.reset();
  }


  //BOILERPLATE CODE

  get userPrompt() {
    return this.promptForm.get('userPrompt');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
