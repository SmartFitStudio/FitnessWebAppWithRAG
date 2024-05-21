import { Component, TemplateRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RagllmService } from '../../../../services/services/ragllm.service';
import { ConversationMessage } from '../../services/models/conversationMessage';
import * as Showdown from 'showdown';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
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
		this.offcanvasService.open(content, { position: 'end' });
	}

  onSubmit() {
    const promptValue = this.userPrompt?.value;
    if(promptValue) {
      this.promptForm.disable();
      this.messages.push({userPrompt: promptValue.trim(), chatbotResponse: ''});
      const subscription$ = this.ragllmService.answerQuestion({body: {question: promptValue.trim()}}).subscribe({
          next: ragllmResponse => {
              this.messages[this.messages.length-1].chatbotResponse = this.converter.makeHtml(ragllmResponse.response.toString());
          },
          error: error => {
            this.promptForm.enable();
            this.messages[this.messages.length-1].chatbotResponse = this.converter.makeHtml(error.error.error);
          },
          complete: () => {
            this.promptForm.enable();
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
}
