---
layout: default
permalink: /contact/
---

## Contact us

<div class="row py-4">
  <div class="col-md-12">
    <div class="well well-sm">
      <form name="contact" method="POST" data-netlify="true">
        <!-- Campos ocultos obligatorios para Netlify -->
        <input type="hidden" name="form-name" value="contact">
        <input type="hidden" name="_next" value="/gracias/">

        <!-- Name -->
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your name" class="form-control" required>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Your Email</label>
          <input id="email" name="email" type="email" placeholder="Your email" class="form-control" required>
        </div>

        <!-- Message -->
        <div class="form-group">
          <label for="message">Your Message</label>
          <textarea id="message" name="message" placeholder="Please enter your message here..." class="form-control" rows="5" required></textarea>
        </div>

        <!-- Consent -->
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="consent" name="consent" value="accepted" required>
          <label class="form-check-label" for="consent">
            I consent to the processing of my data for marketing purposes and understand it may be shared with third-party partners. 
            <a href="/privacy-policy" target="_blank">Read our Privacy Policy</a>.
          </label>
        </div>

        <!-- Submit -->
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  </div>
</div>

