/**
 * Test 2 WEDB6201 - Client Side Scripting
 * Author: Luis Grijalva 100719475
 * Date: 3/8/2020
 */
class Contact
{
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}




"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();

    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

        

        let pageName = name.substring(1, name.length - 5);

        // fixed bug in page switching
        if(name == "/")
        {
            pageName = "index";
        }
       

       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            case "tasklist":
                DisplayTaskList();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";

        document.title = "WEBD6201 - Home";

        let taskListButton = $("#taskListButton").click(function(){
            location.href = "./tasklist.html";
        });
    }

    function DisplayTaskList()
    {
        document.title = "WEBD6201 - Task List";

        // Task 1 a
        $("#newTaskButton").on("click", function(){
            //Get any li element and clone it
            let clonedTask = $("#taskList").children().last().clone();
            //Assign a new ID
            $(clonedTask).attr("id","newTask");
            //Get the text from the input
            let tastText= $(taskTextInput).val();
            //Set the text to the task
            $(clonedTask).find('span#taskText').text(tastText);
            //Append it to the task list
            $("#taskList").append(clonedTask);
            
        });

        // Task 1 b
        $("ul").on("click", ".editButton", function(){
            //Get the li element containing the button that was pressed
           let parentLI = $(this).parent().parent()[0];
           //Get the edit text input
           let editText =$(parentLI).find(".editTextInput");
           //Show the input
           $(editText).show(); 

           //Define the "press enter" event on the textbutton
           $(editText).on('keypress', function (e) {
               //13 is keycode for enter
               if (e.which ==13) {
                   //Get the text on the textbox
                   let editString = $(this).val();
                   //Set the text to the span element
                   $(parentLI).find("span#taskText").text(editString);
                   //Hide the edit text input
                   $(this).hide();
               }
           });

        });
        // Task 1 c
        $("ul").on("click", ".deleteButton", function(){
            //Get the li element containing the button that was pressed
            let parentLI = $(this).parent().parent()[0];
            //Show a confirm dialog, if yes, delete
            if (confirm("Are you sure?")) {
                //Remove the li element from the DOM
                $(parentLI).remove();
            }
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit  ((e)=>
        {
           
            e.preventDefault();
            e.stopPropagation();
            $("#loginForm")[0].reset();
            $("#login").hide();
            $("#logout").show();

        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

