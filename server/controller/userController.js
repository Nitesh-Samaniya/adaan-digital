const User = require('../model/User');

exports.getProfile = async (req,res)=>{
    const userId = req.user.id;
    try {
        const user = await User.findById(userId, {password: 0});
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        return res.status(200).json({message: 'user found successfully', user});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.updateProfile = async (req,res)=>{
    const {id, name, photo, experience, skills, education} = req.body;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: 'user not found'});
        }

        user.name = name || user.name;
        user.photo = photo || user.photo;
        user.experience = experience || user.experience;
        user.skills = skills || user.skills;
        user.education = education || user.education;

        user.save();
        return res.status(200).json({message: 'user updated successfully', user});
    } catch (error) {
        return res.status(500).json(error.message);
    }
}