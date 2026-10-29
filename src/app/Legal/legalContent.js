const CONTACT = "The Himachali Way, Village Seo, PO Naswal, Tehsil Ghumarwin, District Bilaspur, Himachal Pradesh 174021, India. Email: thehimachaliway@gmail.com. Phone/WhatsApp: +91 80917 36987.";

export const legalPages = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains what information The Himachali Way (\"we\", \"us\") collects when you visit thehimachaliway.com or contact us, how we use it, and the choices you have.",
    sections: [
      {
        h: "Information we collect",
        list: [
          "Details you share when you contact or order from us: your name, phone number, email, delivery address and the message you send.",
          "Messages you send through our contact form (name, email, optional phone, subject and message). These are stored securely in our database on Cloudflare so we can reply, and the form also opens WhatsApp with your message.",
                    "Basic technical data our hosting and third-party services may collect automatically, such as browser type, device and pages visited.",
        ],
      },
      {
        h: "How we use your information",
        list: [
          "To answer your questions and process, deliver and support your orders.",
          "To send you updates you asked for, such as new launches, if you choose to subscribe.",
          "To improve our products, website and service.",
          "To meet legal, tax and accounting requirements.",
        ],
      },
      {
        h: "Third-party services",
        p: [
          "Our website uses services run by other companies, each with its own privacy policy: Cloudflare (website hosting and contact form storage), WhatsApp (messages and orders), Google Maps (the map on our contact page) and Google Fonts. Links to Instagram, Facebook, YouTube and LinkedIn take you to those platforms.",
          "We share delivery details with courier partners only as needed to deliver your order. We do not sell your personal information.",
        ],
      },
      {
        h: "Cookies",
        p: ["We do not set our own tracking cookies. Third-party services embedded on the site, such as Google Maps, may set their own cookies. You can block or delete cookies in your browser settings."],
      },
      {
        h: "Data retention and security",
        p: ["We keep order and contact details only as long as needed for the purposes above or as required by law, and take reasonable steps to protect them."],
      },
      {
        h: "Your rights",
        p: ["You can ask us to access, correct or delete the personal information we hold about you, or to stop sending you updates, by writing to us at the email below."],
      },
      {
        h: "Changes to this policy",
        p: ["We may update this policy from time to time. The latest version will always be on this page with its updated date."],
      },
      { h: "Contact us", p: [CONTACT] },
    ],
  },

  terms: {
    title: "Terms & Conditions",
    intro:
      "These Terms & Conditions apply to your use of thehimachaliway.com and to orders placed with The Himachali Way. By using the site or placing an order, you agree to them.",
    sections: [
      {
        h: "Products",
        p: [
          "Our pickles are handmade in small batches from natural ingredients, so colour, texture and spice level can vary slightly from batch to batch and from product photos.",
          "Please read the ingredient list on each jar before eating, especially if you have food allergies.",
        ],
      },
      {
        h: "Orders and pricing",
        list: [
          "Orders are placed by WhatsApp or phone and are confirmed only once we reply to confirm availability, price and delivery details.",
          "Prices shown on the website are in Indian Rupees and may change without notice. The price confirmed with your order is the price you pay.",
          "We may decline or cancel an order, for example if a product is out of stock or a price is shown in error. If you have already paid, we will refund you in full.",
        ],
      },
      {
        h: "Delivery",
        p: ["Delivery timelines and charges are described in our Shipping & Returns policy."],
      },
      {
        h: "Storage and use",
        p: ["Follow the storage instructions on the jar: use a clean, dry spoon, keep the lid tightly closed and refrigerate after opening. We are not responsible for spoilage caused by improper storage after delivery."],
      },
      {
        h: "Intellectual property",
        p: ["All content on this website, including text, photos, logos and recipes, belongs to The Himachali Way and may not be copied or reused without our written permission."],
      },
      {
        h: "Limitation of liability",
        p: ["To the extent allowed by law, our liability for any order is limited to the amount you paid for that order."],
      },
      {
        h: "Governing law",
        p: ["These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts of Bilaspur, Himachal Pradesh."],
      },
      { h: "Contact us", p: [CONTACT] },
    ],
  },

  shipping: {
    title: "Shipping & Returns",
    intro: "We pack every jar carefully so it reaches you fresh. Here is how delivery, replacements and refunds work.",
    sections: [
      {
        h: "Shipping",
        list: [
          "We ship across India.",
          "Most orders arrive in 3–6 business days, depending on your location.",
          "Tracking details are shared once your order is dispatched.",
          "Any delivery charge is confirmed with you before your order is placed.",
        ],
      },
      {
        h: "Damaged or wrong items",
        p: [
          "If your jar arrives damaged or you receive the wrong product, send us a photo on WhatsApp or email within 48 hours of delivery. We will replace it or refund you.",
        ],
      },
      {
        h: "Returns",
        p: ["Because pickles are food products, we cannot accept returns of opened jars or for a change of mind. Unopened, undamaged jars are handled case by case; contact us within 48 hours of delivery."],
      },
      {
        h: "Cancellations",
        p: ["You can cancel your order free of charge before it is dispatched. Once dispatched, it can no longer be cancelled."],
      },
      {
        h: "Refunds",
        p: ["Approved refunds are made to the original payment method, usually within 5–7 business days."],
      },
      { h: "Contact us", p: [CONTACT] },
    ],
  },
};
