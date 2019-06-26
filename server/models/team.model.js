const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
let TeamSchema = Schema({
  alumnus: [{
    type: ObjectId,
    ref: "User"
  }],
  bio: {
    type: String,
    default: ""
  },
  captain: {
    type: ObjectId,
    ref: "User"
  },
  car: {
    type: Number,
    ref: "Car"
  },
  cars: [{
    type: Number,
    ref: "Car"
  }],
  category: {
    type: String,
    enum: ["combustion", "electric"],
    required: true,
  },
  country: {
    type: String
  },
  drive_folder: {
    type: String
  },
  events: [{
    type: Number,
    ref: "Event"
  }],
  institution: {
    address: {
      type: String
    },
    name: {
      type: String
    },
    short_name: {
      type: String
    }
  },
  live_timings: [{
    type: Number,
    ref: "LiveTiming"
  }],
  location: {
    type: String
  },
  logo: {
    type: String,
    default: ""
  },
  old_events: [{
    name: "",
    link: String,
  }],
  past_event: [{
    type: Number,
    ref: "PastEvent"
  }],
  social: {
    facebook: {
      default: "",
      type: String
    },
    instagram: {
      default: "",
      type: String
    },
    twitter: {
      default: "",
      type: String
    }
  },
  static_schedules: [{
    ref: "StaticSchedule",
    type: Number,
  }],
  team_captain_email: {
    type: String
  },
  team_captain_full_name: {
    type: String
  },
  team_name: {
    type: String,
  },
  tech_updates: [{
    type: Number,
    ref: "TechUpdate"
  }],
  users: [{
    type: ObjectId,
    ref: "User"
  }],
  website_url: {
    type: String,
    default: ""
  },
  former_name: {
    type: String
  }
}, {
    timestamps: true
  }
);

let newTeamSchema = Schema({
  alumnus: [{
    type: ObjectId,
    ref: "User"
  }],
  bio: {
    type: String,
    default: ""
  },
  captain: {
    type: ObjectId,
    ref: "User"
  },
  car: [{
    type: Number,
    ref: "Car"
  }],
  category: {
    type: String,
    enum: ["combustion", "electric"],
    required: true,
  },
  country: {
    type: String
  },
  drive_folder: {
    type: String
  },
  events: [{
    type: Number,
    ref: "Event"
  }],
  institution: {
    address: {
      type: String
    },
    name: {
      type: String
    },
    short_name: {
      type: String
    }
  },
  live_timings: [{
    type: Number,
    ref: "LiveTiming"
  }],
  location: {
    type: String
  },
  logo: {
    type: String,
    default: ""
  },
  old_events: [{
    name: "",
    link: String,
  }],
  past_event: [{
    type: Number,
    ref: "PastEvent"
  }],
  social: {
    facebook: {
      default: "",
      type: String
    },
    instagram: {
      default: "",
      type: String
    },
    twitter: {
      default: "",
      type: String
    }
  },
  static_schedules: [{
    ref: "StaticSchedule",
    type: Number,
  }],
  team_captain_email: {
    type: String
  },
  team_captain_full_name: {
    type: String
  },
  team_name: {
    type: String,
  },
  tech_updates: [{
    type: Number,
    ref: "TechUpdate"
  }],
  users: [{
    type: ObjectId,
    ref: "User"
  }],
  website_url: {
    type: String,
    default: ""
  },
  former_name: {
    type: String
  }
}, {
    timestamps: true
  }
);
module.exports = mongoose.model("Team", TeamSchema)