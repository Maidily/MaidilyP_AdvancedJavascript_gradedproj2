
sessionStorage.setItem("index", 0);

var searchData = data.resume;
console.log(searchData);

let currentResume = data.resume[0];
//console.log(currentResume);

renderResume(currentResume);
showHidePrevNextButton(Number(sessionStorage.getItem("index")));



// rendering the current Resume details
function renderResume(currentResume) {

    // enabling resume content : default; disabling no-result
    document.getElementById("default").style.display = "block";
    document.getElementById("no-result").style.display = "none";
    
    renderResumeHead(currentResume.basics);
    renderSectionPersonalInfo(currentResume.basics);
    renderSectionTechSkills(currentResume.skills);
    renderSectionHobbies(currentResume.interests.hobbies);
    renderChildWorkExperience(currentResume.work);
    renderChildProject(currentResume.projects);
    renderChildEducation(currentResume.education);
    renderChildInternships(currentResume.Internship);
    renderChildAchievements(currentResume.achievements);

}


// rendering Resume Head
function renderResumeHead(basics) {

    let name = document.getElementById("name");
    let address = document.getElementById("location");
    let appliedFor = document.getElementById("apply-for");

    name.innerText = `${basics.name}`;
    address.innerText = `${basics.location.address}, ${basics.location.city}, ${basics.location.state} - ${basics.location.postalCode}`;
    appliedFor.innerText = `${basics.AppliedFor}`;

}


// rendering Resume Personal Information - Section 
function renderSectionPersonalInfo(basics) {

    let personalInfo = document.getElementById("per-info");
    let personalInfoLink = document.getElementById("per-info-link");

    personalInfoLink.href = basics.profiles.url;
    personalInfo.innerText = `${basics.phone} \n${basics.email} \n`;
    personalInfo.appendChild(personalInfoLink);

}


// rendering Resume Technical Skills - Section
function renderSectionTechSkills(skills) {

    let techInfo = document.getElementById("tech-info");
    techInfo.innerHTML = '';

    skills.keywords.forEach(element => {
        techInfo.innerText += `${element} \n`;
    });

}


// rendering Resume Hobbies - Section
function renderSectionHobbies(hobbies) {

    let hobbyInfo = document.getElementById("hobby-info");
    hobbyInfo.innerHTML = '';

    hobbies.forEach(element => {
        hobbyInfo.innerText += `${element} \n`;
    });

}


// rendering Resume Work Experience
function renderChildWorkExperience(work) {

    let company = document.getElementById("company");
    let position = document.getElementById("position");
    let startDate = document.getElementById("start-date");
    let endDate = document.getElementById("end-date");
    let summary = document.getElementById("summary");

    company.innerText = work['Company Name'];
    position.innerText = `${work.Position}`;
    startDate.innerText = work['Start Date'];
    endDate.innerText = work['End Date'];
    summary.innerText = `${work.Summary};`

}


// rendering Resume Projects
function renderChildProject(projects) {

    let projectInfo = document.getElementById("proj-info");
    let projectName = document.getElementById("proj-name");

    projectName.innerText = `${projects.name}: `;
    projectInfo.innerText = `${projects.description}`;
    projectName.appendChild(projectInfo);

}


// rendering Resume Education Information
function renderChildEducation(education) {

    let ug = document.getElementById("ug");
    let pu = document.getElementById("pu");
    let highSchool = document.getElementById("school");

    ug.innerText = `${education.UG.institute}, ${education.UG.course}, ${education.UG["Start Date"]}, ${education.UG['End Date']}, ${education.UG.cgpa}`;
    pu.innerText = `${education['Senior Secondary'].institute}, ${education['Senior Secondary'].cgpa}`;
    highSchool.innerText = `${education['High School'].institute}, ${education['High School'].cgpa}`;

}


// rendering Resume Intership details
function renderChildInternships(Internship) {

    let internCompany = document.getElementById("i-company");
    let internPosition = document.getElementById("i-position");
    let internStartDate = document.getElementById("i-start-date");
    let internEndDate = document.getElementById("i-end-date");
    let internSummary = document.getElementById("i-summary");

    internCompany.innerText = Internship['Company Name'];
    internPosition.innerText = `${Internship.Position}`;
    internStartDate.innerText = Internship['Start Date'];
    internEndDate.innerText = Internship['End Date'];
    internSummary.innerText = `${Internship.Summary}`;

}


// rendering Resume Achievement details
function renderChildAchievements(achievements) {

    let achievement = document.getElementById("a-summary");
    achievement.innerHTML = '';

    achievements.Summary.forEach(element => {
        let listItem = document.createElement("li");
        listItem.innerText = `${element}`;
        listItem.style.fontWeight = "normal";
        achievement.appendChild(listItem);
    });

}


// rendering Next Page on click of NEXT button
function goToNextPage() {
	
    let index = Number(sessionStorage.getItem("index"));
    index = index + 1;
    //console.log(index);
    if (index < data.resume.length) {
        currentResume = searchData[index]; //data.resume[index];
        sessionStorage.setItem("index", index.toString());
        renderResume(currentResume);

        showHidePrevNextButton(index);
    }
}


// rendering Previous Page on click of PREVIOUS button
function goToPreviousPage() {
	
    let index = Number(sessionStorage.getItem("index"));
    index = index - 1;
    //console.log(index);
    if (index > -1) {
        currentResume = searchData[index]; //data.resume[index];
        sessionStorage.setItem("index", index.toString());
        renderResume(currentResume);

        showHidePrevNextButton(index);
    }
}


// controlling PREV and NEXT buttons visibility based on Data
function showHidePrevNextButton(index) {

    if (index + 1 === searchData.length /*data.resume.length*/) {
        document.getElementById("next").style.display = "none";
    }
    else {
        document.getElementById("next").style.display = "inline-block";
    }

    if (index - 1 === -1) {
        document.getElementById("prev").style.display = "none";
    }
    else {
        document.getElementById("prev").style.display = "inline-block";
    }
    
}


// searching or filtering json data based on entered keyword
function search(value) {
    return data.resume.filter((element) => element.basics.AppliedFor.toLowerCase().includes(value.toLowerCase()))
}


// rendering results based on search keywords
function searchResumeOnAppliedJob() {

    let searchKeyword = document.getElementById("search").value;

    sessionStorage.setItem("index", 0);
    
    if (searchKeyword.length > 0) {
        // rendering respective search matched resume
        searchData = search(searchKeyword);
        console.log(searchData);

        if (searchData.length === 0) {
            // rendering no-result content with no matching result
            document.getElementById("default").style.display = "none";
            document.getElementById("no-result").style.display = "flex";
        }
        else {
            // rendering resume content for the matching result
            document.getElementById("default").style.display = "block";
            document.getElementById("no-result").style.display = "none";

            currentResume = searchData[0];
            renderResume(currentResume);
            showHidePrevNextButton(Number(sessionStorage.getItem("index")));
        }
    }
    else {
        // rendering all results at the time of no input
        searchData = data.resume;
        currentResume = data.resume[0];
        renderResume(currentResume);
        showHidePrevNextButton(Number(sessionStorage.getItem("index")));
    }
}



// preventing back button action :: logged-out-page to resume-page
window.history.forward();
function noBack() {
    window.history.forward();
}