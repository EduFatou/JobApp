const Job = require('../models/jobs.model');

const listJobs = async () => {
    try {
        const jobs = await Job
            .find()
            .select('title description skills client_location url source -_id')
        console.log(jobs);
        return jobs;
    } catch (error) {
        console.log('Error listing jobs:', error);
    }
};

const createJob = async (title, description, skills, client_location, url, source) => {
    try {
        const job = new Job({
            title,
            description,
            skills,
            client_location,
            url,
            source
        });

        const result = await job.save();
        console.log(result);
        return result;
    } catch (error) {
        console.log('Error creating job:', error);
    }
};

const updateJob = async (filter, update) => {
    try {
        const modifiedJob = await Job
            .findOneAndUpdate(filter, update, {
                new: true
            });
        console.log(modifiedJob);
        return modifiedJob;
    } catch (error) {
        console.log('Cannot update job, error:', error)
    }
};

const deleteJob = async (filter) => {
    try {
        const removedJob = await Job
            .deleteOne({ 'title': filter });
        console.log(removedJob);
        return removedJob;
    } catch (error) {
        console.log('Error deleting job:', error);
    }
};

module.exports = {
    listJobs,
    createJob,
    updateJob,
    deleteJob
};

//createJob('Twitter embed from website shared to twitter','having issue with embedding correctly an image into our twitter share . see screenhots where image is missing, quick and easy task, looking forward to hearing from you' 'Twitter/X, HTML, JavaScript', 'Spain');

//listJobs();
/*
updateJob({title: 'Twitter embed from website shared to twitter'},
const j = new Job({
    title: "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
    description: "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
    skills: "Shopify, Web Design, Data Entry",
    client_location: "United States"
}););
*/
// deleteJob("Experienced Virtual Assistant for Creating Shopify Landing/Product Pages");
