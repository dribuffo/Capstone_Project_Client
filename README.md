# PROJECT 4 OVERVIEW

---

This full stack application will make use of a heroku hosted database to display my guild's collection of collectables by person.
[Deployed Frontend](https://dribuffo.github.io/Capstone_Project_Client/)

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
|  T  | Back End: Finish CRUD and start Front End Basic Design | complete |
|  W  |          Front End: Basic Design and display           | complete |
|  R  |       Front End: Finish display and start filter       | complete |
|  F  | Front End: Finish filter and start Responsiveness/CSS  | complete |
|  M  |                   Finish and Deploy                    | complete |
|  T  |                   Presentation day!                    | complete |

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
|    Component shell     |    H     |    .5 hour     |      1 hr      |
|         Header         |    M     |    .5 hour     |      dropped      |
|         Footer         |    L     |    .5 hour     |      1 hr      |
|        Routing         |    H     |    .5 hour     |      1.5 hr      |
|  Dummy Data Creation   |    M     |    2 hours     |      1 hr      |
|     Single Display     |    H     |    2 hours     |      4 hr      |
|     Group Display      |    H     |    2 hours     |      2 hr      |
|     Create Filters     |    H     |    4 hours     |      6 hrs      |
| Connecting to back end |    H     |    3 hours     |      1 hr      |
|       Responsiveness       |    H     |    2 hours     |      1 hr      |
|  Display adjustments   |    M     |    3 hours     |      1hrs     |
|          CSS           |    M     |    3 hours     |      2.5hrs      |
|         Total          |          |     23 hrs     |      22 hrs      |

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
[Working screenshot](https://drive.google.com/file/d/1QT6EBPjg_JOl1b7t5R0nl1RydZlNKdid/view?usp=sharing)

## TECHNOBABBLE
---
For the front end of my MERN app I used React, a front end framework that we have been using since unit 2 and that I'm the most comfortable and familiar with. 

## CODE SNIPPET
---
```js
{ponyValues.map((value) => (
<td>
{value ? (<img className="icon" src={yes} alt="yes" />) : (<img className="icon" src={no} alt="no" />)}
</td>
))}
```
One of the pieces I'm really proud of is actually just a simple ternary operation that outputs a green checkmark if the Player owns something and a red X mark if they don't. It looks so simple, but implementing this in the .map was a bit tricker than initially thought. I had to take all the values of the pony object nested in my player object and map through those in the return function of mapping through all the player objects.


## LIBRARIES & ADDITIONAL DEPENDENCIES
---

 [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)
 I used bootstrap to create the tables, buttons, and navbar. This really helped when it came time to make things responsive, since bootstrap does a lot of that for you. It cut down on my styling time as well. Very helpful now that I understand how it works. To install follow the documentation in the link

## CREDITED CODE BLOCKS & ATTRIBUTES
---
  [User/Auth](https://www.youtube.com/watch?v=HGgyd1bYWsE)
  Used the above Youtube video to help implement a signup and log in page for my project.

<a href="https://www.flaticon.com/free-icons/github" title="github icons">Github icons created by Pixel perfect - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons">Linkedin icons created by riajulislam - Flaticon</a>

[Button to change page](https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page)
Used the above stackoverflow post to help me make a button that takes the user to the update page from the add a new player page.

[home page wallpaper](https://wallpapers.com/wallpapers/final-fantasy-xiv-hd-wallpaper-exae2peai92o5iwd.html)
Used the above reddit thread to find the homepage background for my project. The above person posted it, but it was originally drawn by someone at Square-enix.

SHout out to Aidyn who helped me get my different displays working. I borrowed some of the code she wrote (with her permission) from her Project 4 project.

## FUTURE SURMOUNTABLES
---
I wasn't able to get my update page to make use of react bootstraps checkboxes, so instead I had to put in a simple form submission to update certain portions of my Player object. I left the code commented out as a breadcrumb to remind myself what I was doing. Using those to return data was an interesting challenge I was hoping to have worked through, as I think it looks a bit cleaner overall and is quicker to use, but I wasn't able to work those into making my PUT fetch request quite like I hoped.
