const Professional = require("../models/Professional");
const User = require("../models/UserModel");
const Project = require("../models/ProjectModel"); // ✅ Add this
const Review = require("../models/ReviewModel"); // ✅ Add this
const Shop = require("../models/ShopModel"); // ✅ Add this


//🟥 Get all pros
const getProfessionals = async (req, res) => {
    try {
        const { page = 1, category, searchQuery, location } = req.query;
        const pageSize = 10; // Set the page size to 10

        // Build the filter object dynamically based on the provided query parameters
        let filter = {};

        // Filter by category (profession) if provided
        if (category && category !== 'Select All') {
            filter.profession = category;
        }
        
        filter.status="approved";
        // Filter by search query (name or description)
        if (searchQuery) {
            filter.$or = [
                { profession: { $regex: searchQuery, $options: 'i' } },
                { bio: { $regex: searchQuery, $options: 'i' } },
            ];
        }

        // Filter by location if provided (and not 'Select All')
        if (location && location !== 'Select All') {
            filter.location = { $regex: location, $options: 'i' };
        }

        // Fetch professionals with pagination, sorting by rating first, and then filtering
        const professionals = await Professional.find(filter)
            .populate({ path: "userId", select: "firstname lastname profilePicture email" })
            .populate("projects")
            .populate("reviews")
            .populate("linkedShops")
            .sort({ "rating.average": -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        // Count the total number of professionals for pagination
        const totalProfessionals = await Professional.countDocuments(filter);

        res.status(200).json({
            professionals,
            totalPages: Math.ceil(totalProfessionals / pageSize),
            currentPage: parseInt(page),
            totalProfessionals,
        });
    } catch (error) {
        console.error("Error fetching professionals:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//🟥 Get pro by id
const getProfessionalDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch professional details with proper population
    const professional = await Professional.findById(id)
      .populate({
        path: "userId",
        select: "firstname lastname profilePicture"
      })
      .populate({
        path: "projects",
        select: "title images category rating createdAt" // Select only needed fields
      })
      .populate({
        path: "reviews",
        populate: {
          path: "userId",
          select: "firstname lastname profilePicture"
        }
      });

    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    // Safely handle missing user data
    if (!professional.userId) {
      return res.status(404).json({ message: "User not found for this professional" });
    }

    // Calculate average rating with null check
    const totalReviews = professional.reviews?.length || 0;
    const averageRating = totalReviews > 0
      ? professional.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews
      : 0;

    // Build response with fallback values
    const proData = {
      _id: professional._id,
      user: {
        _id: professional.userId._id,
        name: `${professional.userId.firstname || ''} ${professional.userId.lastname || ''}`.trim() || 'Anonymous',
        profileImage: professional.userId.profilePicture || 'https://via.placeholder.com/150'
      },
      backgroundImage: professional.backgroundImage || 'https://via.placeholder.com/1200x400',
      profession: professional.profession || 'Professional',
      rate: professional.rating,
      bio: professional.bio || 'No bio available',
      shortBio: professional.bio?.substring(0, 150) + (professional.bio?.length > 150 ? '...' : '') || 'No bio available',
      location: professional.location || 'Location not specified',
      pricePerHour: professional.pricePerHour || 0,
      projects: professional.projects?.map(proj => ({
        _id: proj._id,
        name: proj.title || 'Untitled Project',
        image: proj.images?.[0] || 'https://via.placeholder.com/400x300',
        category: proj.category || 'Uncategorized',
        rating: proj.rating || 0,
        createdAt: proj.createdAt
      })) || [],
      reviews: professional.reviews?.map(review => ({
        _id: review._id,
        rating: review.rating || 0,
        content: review.comment || 'No comment',
        user: {
          _id: review.userId?._id || null,
          name: `${review.userId?.firstname || ''} ${review.userId?.lastname || ''}`.trim() || 'Anonymous',
          profileImage: review.userId?.profilePicture || 'https://via.placeholder.com/50'
        },
        date: review.createdAt || new Date()
      })) || [],
      rating: averageRating.toFixed(1),
      reviewCount: totalReviews,
      isSaved: false // Will be updated on frontend if user is logged in
    };

    res.status(200).json(proData);
  } catch (error) {
    console.error("Error fetching professional details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//🟥 post pro using postman test
const addProfessional = async (req, res) => {
  try {
      const professional = new Professional(req.body);
      await professional.save();
      res.status(201).json(professional);
  } catch (error) {
      console.error("Error adding professional:", error);
      res.status(500).json({ message: "Server error" });
  }
};

//🟥 Create new pro 
const createProfessional = async (req, res) => {
  try {
    const {
      userId,
      profession,
      experience,
      location,
      pricePerHour,
      isOrganization,
      bio,
      portfolio,
      certifications,
      backgroundImage,
      linkedShops,
    } = req.body;

    // 1. Create Professional
    const newPro = await Professional.create({
      userId,
      profession,
      experience,
      location,
      pricePerHour,
      isOrganization,
      bio,
      portfolio,
      certifications,
      backgroundImage,
      linkedShops,
    });

    // 2. Update User to reference the Pro
    await User.findByIdAndUpdate(userId, { professionalId: newPro._id });

    res.status(201).json({ message: "Professional profile created", professional: newPro });
  } catch (error) {
    console.error("Create Pro Error:", error);
    res.status(500).json({ error: "Failed to create professional profile" });
  }
};

module.exports = { addProfessional, getProfessionals, getProfessionalDetails, createProfessional };
