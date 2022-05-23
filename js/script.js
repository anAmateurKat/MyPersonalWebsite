/*This class represents a course. It has has a constructor
which sets all the attributes of the course
*/
class Course{
    constructor(imgSource, code, level, title, description){
        this.imgSource = imgSource;
        this.code = code;
        this.level = level;
        this.title = title;
        this.description = description; 
    }

    leveltoString(){
        return "Level " + this.level.toString();
    }

}

//Create an array which holds the Course Objects
let coursesArr = [];
coursesArr[0] = new Course("images/compEssentials.jpeg",
                "CST8101", 1, "Computer Essentials",
                "Learn the essentials of computer software, hardware, and laptop management to form a foundation for building further technical programmings skills. Learn to configure your laptop environment, basic PC and troubleshoot problems through a basic understanding of the Windows Operating System."
                );
coursesArr[1] = new Course("images/intro2java.jpeg",
                "CST8116", 1, "Introduction to Computer Programming",
                "Learn the fundamentals of logic, problem-solving and programming language structure students develop introductory knowledge of computer programming with emphasis on problem analysis and design, using algorithms, pseudocode, flowcharts, UML Class Diagrams and testing, with the Java programming language."                
                );
coursesArr[2] = new Course("images/intro2DBs.jpeg",
                "CST8215", 1, "Introduction to Database",
                "Students learn the fundamentals of Relational Databases design using Entity Relation diagrams, and use postgreSQL to create, modify and query a database. Students design and create databases that are maintainable, secure and adaptable to change in business requirements, using Normalization."
                );
coursesArr[3] = new Course("images/achievingSuccess.jpeg",
                "CST8300", 1, "Achieving Success in Changing Environments",
                "Students explore how rapid changes in technology have created significant employment opportunities, but it also creates ethical problems. Students explore the possibilities ahead, assess their own aptitudes and strengths, and apply critical thinking and decision-making tools to help resolve some of the important issues in our complex society."
                );
coursesArr[4] = new Course("images/comms.jpeg",
                "ENL1813T", 1, "Communications I",
                "Students practise writing, speaking, reading, listening, locating and documenting information and using technology to communicate professionally. Students learn the importance of communication as an essential skill sought by employers, field of study notwithstanding"
                );
coursesArr[5] = new Course("images/techMath.jpeg",
                "MAT8001C", 1, "Technical Mathematics for Computer Science",
                "Students manipulate algebraic expressions, solve algebraic equations and linear systems. Students investigate computer number systems in addition to Boolean algebra and logic to help solve problems involving computer systems."
                );
coursesArr[6] = new Course("images/personalUnderstanding.jpeg",
                "GED0014", 2, "Personal Understanding",
                "Explore individual development, economic function, social life, challenges and opportunities, meaning and purpose. Consider human social behaviour and explain how individuals manage various social systems and institutions to become integrated psychological and physiological beings."
                );
coursesArr[7] = new Course("images/science&tech.jpeg",
                "GED0015", 4, "Science and Technology",
                "Students explore the nature of matter, energy, and related universal concepts in science. Apply the scientific method to conduct basic scientific inquiry. Student also discuss the role of technological innovation in the world and the increasing impact of technology on all aspects of human endeavour."
                );


//call the loadCourses method to load course information when the page has loaded
window.addEventListener("load", loadCourses(coursesArr));
window.addEventListener("load", searchable);
window.addEventListener("load", filter);
window.addEventListener("load", sort);


/*This function loads the course information given an array*/
function loadCourses(arrayX){
    document.getElementById("results").innerHTML = "";

    let containerDiv, detailsDiv, descriptionDiv;
    let imgTag, codePTag, levelPTag, titlePTag, descriptionPTag;

    for(let i=0; i < arrayX.length; i++){
        //create a div with class property = 'course container'
        containerDiv = document.createElement("div");
        containerDiv.className = "course-container";
        //create a div with class property = 'course details'
        detailsDiv = document.createElement("div");
        detailsDiv.className = "course-details";
        //create a div with class property = 'course description'
        descriptionDiv = document.createElement("div");
        descriptionDiv.className = "course-description";
    
    
        /*make the following tags children of detailsDiv
            -create img tag w/the appropriate attributes
            -create p tag (for course code)
            -create p tag (for level)
        */
       imgTag = document.createElement("img");
       imgTag.src = arrayX[i].imgSource;
       imgTag.width = 70;
       imgTag.height = 50;
    
       codePTag = document.createElement("p");
       codePTag.appendChild(document.createTextNode(arrayX[i].code));
       
       levelPTag = document.createElement("p");
       levelPTag.appendChild(document.createTextNode("Level " + arrayX[i].level));
    
       detailsDiv.appendChild(imgTag);
       detailsDiv.appendChild(codePTag);
       detailsDiv.appendChild(levelPTag);
    
       /*make the following tags children of descriptionDiv
            -create p tag (for course title)
            -create p tag (for course description)
        */
        titlePTag = document.createElement("p");
        titlePTag.appendChild(document.createTextNode(arrayX[i].title));
        
        descriptionPTag = document.createElement("p");
        descriptionPTag.appendChild(document.createTextNode(arrayX[i].description));
    
        descriptionDiv.appendChild(titlePTag);
        descriptionDiv.appendChild(descriptionPTag);
    
        //make deatilsDiv and descriptionDiv children of containerDiv
        containerDiv.appendChild(detailsDiv);
        containerDiv.appendChild(descriptionDiv);

        //add all the page data to the results div
        document.getElementById("results").appendChild(containerDiv);

    }
}

/*This function matches the search string with the values 
in the array, giving the search bar dynamic nature*/
function searchable(){
    //get the search bar input tag
    let search = document.getElementById("search");
    //add an event listener for the searchBar
    search.addEventListener("keyup", (s) => {
        //get the user input
        let searchString = s.target.value.toLowerCase();

        //create a new filtered array containing only characters
        //that match the fields of courses in coursesArray
        let matchedChars = coursesArr.filter(course => {
            return course.code.toLowerCase().includes(searchString) ||
            course.leveltoString().toLowerCase().includes(searchString) ||
            course.title.toLowerCase().includes(searchString) ||
            course.description.toLowerCase().includes(searchString)
        });

        //call the function to load the filtered search results to the page
        loadCourses(matchedChars);
    });
   
}

/*This function filters courses by Level*/
function filter(){
    //get the select tag
    let filter = document.getElementById("filter");

    //add an event listener for the select option
    filter.addEventListener("change", () =>{
        //only keep the array elements whose level attribute match the appropriate value in the drop down
        let filteredLevelsArr = coursesArr.filter(course => {
            return course.level == filter.value
        });
        if(filter.value == "filter by level")
            loadCourses(coursesArr)
        else
            loadCourses(filteredLevelsArr);
    });
}

/*This function sorts courses by Level*/
function sort(){
    //get the select tag
    let sort = document.getElementById("sort");

    //add an event listener for the select option
    sort.addEventListener("change", () =>{
        //create a new array, where the course will be sorted from highest to lowest or visa versa
        let sortedArr = [];
        
        if(sort.value == "l-to-h"){
            //sort in ascending order, i.e. lowest to highest level
            sortedArr = coursesArr.sort( (course1, course2) => {
                return course1.level - course2.level
            });
        }
        else if(sort.value == "h-to-l"){
            //sort in descending order, i.e. highest to lowest level
            sortedArr = coursesArr.sort( (course1, course2) => {
                return course2.level - course1.level
            });
        }
        
        loadCourses(sortedArr);

    });
}

