import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Input, Output, Renderer2, inject } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.scss'
})
export class AppModal {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Input() title: string = "Default title"
  @Input() size: string = "medium"

  document = inject(DOCUMENT);
  renderer = inject(Renderer2);

  openModal() {
    this.isVisible = true;
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  closeModal() {
    this.isVisible = false;
    this.renderer.removeClass(this.document.body, 'no-scroll');
    this.onClose.emit();
  }
}
