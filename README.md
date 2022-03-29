# PROJECT 4 OVERVIEW

---

This full stack application will make use of a heroku hosted database to display my guild's collection of collectables by person.

## USER STORIES

---

As someone who is used to hosting in-game events to hunt for collectables and nik-nacks it would be nice to have a searchable database to store this information, rather than having to defer to a multipaged spreadsheet.

## PROJECT DESCRIPTION

---

This full stack application will have a REACT front end, utilizing bootstrap to display information from a database that is filterable by expansion pack (and thus specific set of collectables) and with the ability to display a character's collection in it's entirety.

The back end database will be (placeholder) based and will have a main "player" that will reference each set of collectables and store what each player has.

## PROJECT SCHEDULE

---

| Day |                      Deliverable                       |   Status   |
| :-: | :----------------------------------------------------: | :--------: |
|  F  |                   Project Worksheet                    | approved!  |
|  M  |            Back End: models and start CRUD             | complete |
|  T  | Back End: Finish CRUD and start Front End Basic Design | incomplete |
|  W  |          Front End: Basic Design and display           | incomplete |
|  R  |       Front End: Finish display and start filter       | incomplete |
|  F  | Front End: Finish filter and start Responsiveness/CSS  | incomplete |
|  M  |                   Finish and Deploy                    | incomplete |
|  T  |                   Presentation day!                    | incomplete |

## WIREFRAMES

---

- [React Components](https://drive.google.com/file/d/1XpmIEP16nVzZ7K566yMbqMb1atuLpXIy/view?usp=sharing)
- [Desktop Design](https://drive.google.com/file/d/1mvTj39GTqYUyu8exP9Rb2vUnRAkJ8KA-/view?usp=sharing)
- [Mobile Design](https://drive.google.com/file/d/1gltoIkwKS2KjEmqE4C6I17FWqHXIONAD/view?usp=sharing)

## FLOWCHARTS

---

#### MVP
##### Front End

- Create Routes
- Get dummy data to display for individual
- Get dummy data to display for group
- Create Filters
  - Filter for individual character
  - Filter for collection set
- Connect to backend
- Responsiveness and CSS
- Deploy

|       Component        | Priority | Estimated Time | Actual Time |
| :--------------------: | :------: | :------------: | :---------: |
|    Component shell     |    H     |    .5 hour     |      ?      |
|         Header         |    M     |    .5 hour     |      ?      |
|         Footer         |    L     |    .5 hour     |      ?      |
|        Routing         |    H     |    .5 hour     |      ?      |
|  Dummy Data Creation   |    M     |    2 hours     |      ?      |
|     Single Display     |    H     |    2 hours     |      ?      |
|     Group Display      |    H     |    2 hours     |      ?      |
|     Create Filters     |    H     |    4 hours     |      ?      |
| Connecting to back end |    H     |    3 hours     |      ?      |
|       Responsiveness       |    H     |    2 hours     |      ?      |
|  Display adjustments   |    M     |    3 hours     |      ?      |
|          CSS           |    M     |    3 hours     |      ?      |
|         Total          |          |     23 hrs     |      ?      |

#### POST MVP

##### Front End

- Adjust filters to include new collectable sets.
* Connect to character database API
  - Display character's portrait next to their name
* Display item icon under each collectable
* Display item information when you click on specific collectable

|                       Component                        | Priority | Estimated Time | Actual Time |
| :----------------------------------------------------: | :------: | :------------: | :---------: |
|                     Adjust Filters                     |    H     |     2 hour     |      ?      |
| Connect to character database API and display portrait |    M     |    1.5 hour    |      ?      |
|        Display item icon under each collectable        |    L     |    1.5 hrs     |      ?      |
|                Display item information                |    L     |    2 hours     |      ?      |
|                         Total                          |          |     7 hrs      |      ?      |

## WORKING SCREENSHOT

---

## TECHNOBABBLE

---

## CODE SNIPPET

---

## LIBRARIES & ADDITIONAL DEPENDENCIES
---

 [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)

## CREDITED CODE BLOCKS
---
  [User/Auth](https://www.youtube.com/watch?v=HGgyd1bYWsE)
  Used the above Youtube video to help implement a signup and log in page for my project.

## SURMOUNTABLES

---
