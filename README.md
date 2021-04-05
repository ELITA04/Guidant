** Link to the server repo: **

## Inspiration

The inspiration for creating the application came while we were watching a show. This show highlighted the troubles and tribulations that the visually impaired face on a day-to-day basis. It brought attention to the troubles that they face while performing trivial tasks like seeing what is in front of them, reading labels, not being able to open their doors etc. This had a deep impact on us and so we started researching visual impairment. To our surprise, we found an estimated **62 million people** live with vision impairment; of which **54 million people** have low vision and **8 million** are blind in India alone. These numbers are higher among the elders and research shows that these numbers will increase even more in the future. Over four-fifth of visual impairment among elderly persons is either avoidable or treatable.

Thus, keeping the problems faced by the visually impaired in mind, we decided to create an _easy-to-use_ mobile application, that would make their lives easier.
  

## What it does

**GUIDANT** is a mobile application that is completely voice based making it easy and simple to navigate.

The app composes of two main functionalities:

🔹  **Describe**: We observed many applications make use of the Object Descriptor trained on the COCO dataset, which limits the number of objects that the app is able to identify. Therefore, we used the **_Microsoft Azure Cognitive Service - Describe Image_** which not only identifies the objects but gives a brief description of the surrounding. On getting the description, it reads it out to the user.

🔹  **Read**: Many restaurants and fast food joints do not provide menus that are accessible to the visually impaired. We used **_Microsoft Azure Cognitive Service - Read_** which is optimized for text-heavy images, mixed language, and mixed type documents. We then convert these texts into speech which makes it easier for the visually impaired to understand what is on the document.

## How we built it

**GUIDANT** is a mobile application built using React Native and Microsoft Azure.

The entire application is divided into two parts:

**1. Backend**:
The backend is a **_FastAPI_** framework that serves requests sent from the mobile application. Depending on the type of event, the server will communicate with the Azure services and respond back with the received output. We hosted the server on **_Azure App Services_** which fully managed web hosting service for building RESTful APIs. This makes it easier to focus on the key features as we do not have to worry about infrastructure maintenance, security patching, and scaling.

**2. Frontend**
The frontend is a mobile application that was built using **_React Native_** a JavaScript framework. We made use of Expo, which is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React. The main aim of the application was to make it easy to navigate around with large buttons. We also implemented voice commands that will make it easy for the blind to navigate through the application. Along with the key features - “Describe” and “Read”, there is also a help section that will read out the instructions for the user whenever required.


## Challenges we ran into

One of the biggest challenges we faced was integrating the different components together in the application. This was our first time building a React Native application so it took some time getting used to.

We also decided to learn how to use FastAPI as a framework for our server. So getting the requests served from the phone to the server and getting the response from the server to the phone was quite the challenge.

## Accomplishments that we're proud of

We are proud of what we learned during the process of making the application. We worked with frameworks that we hadn’t used before. From the mobile application to the backend server, we decided to learn new frameworks and build our application. We also learned to use Azure services for the first time. The well-documented functionalities made it easier than we thought.

  
## What we learned

We learned about

🔹  Azure Cognitive Services

🔹  Azure App Services

🔹  FastAPI

🔹  React Native

## What's next for Guidant
Using **_Azure’s Cognitive Services_**, there are a few more functionalities that we think would help

🔹 Face Emotion Recognizer: using this the visually impaired can identify the emotions that the people sitting right in front of them are feeling.

🔹 Product Scanner: using which they can find if a particular product is fresh or is past its expiry date.

🔹 Medicine Reader: this not only will help them read the medicine names but also provide information related to the medicine.

🔹 Support for multiple languages: we plan to introduce multi-lingual support for voice commands and speech. This would make it accessible to a larger number of people.


