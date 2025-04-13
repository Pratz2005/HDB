import homeIcon from "../../components/homeIcon";
import primarySchoolIcon from "../../components/primarySchoolIcon";
import secondarySchoolIcon from "../../components/secondarySchoolIcon";
import mrtIcon from "../../components/mrtIcon";
import clinicIcon from "../../components/clinicIcon";
import supermarketIcon from "../../components/supermarketIcon";
import hawkerIcon from "../../components/hawkerIcon";
import juniorCollegeIcon from "../../components/juniorCollegeIcon";
import communityClubIcon from "../../components/communityClubIcon";


export default class IconFactory {
    // select icon based on amenity name
    static getIcon(amenityName) {
      if (amenityName.toLowerCase().includes('primary')) {
        console.log("primary")
        return primarySchoolIcon;
      } else if (amenityName.toLowerCase().includes('secondary')) {
        console.log("secondary")
        return secondarySchoolIcon;
      } else if (amenityName.toLowerCase().includes('junior college')) {
        console.log("JC")
        return juniorCollegeIcon;
      } else if (amenityName.toLowerCase().includes('clinic') || amenityName.toLowerCase().includes('medical') || amenityName.toLowerCase().includes('doctor')) {
        console.log("Clinic")
        return clinicIcon;
      } else if (amenityName.toLowerCase().includes('mrt')) {
        console.log("mrt")
        return mrtIcon;
      } else if (amenityName.toLowerCase().includes('grocery') || amenityName.toLowerCase().includes('cold storage') || amenityName.toLowerCase().includes('fairprice') || amenityName.toLowerCase().includes('sheng siong') || amenityName.toLowerCase().includes('frozen')) {
        console.log("supermarket")
        return supermarketIcon;
      } else if (amenityName.toLowerCase().includes('cc')) {
        console.log("CC")
        return communityClubIcon;
      } else if (amenityName.toLowerCase().includes('food') || amenityName.toLowerCase().includes('blk') || amenityName.toLowerCase().includes('hawker')) {
        console.log("hawker")
        return hawkerIcon;
      } else {
        console.log("")
        return homeIcon; // Default icon if no matches
      }
    }
  }