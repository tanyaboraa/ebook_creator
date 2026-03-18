import { ArrowRight, Sparkles, BookOpen, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import HERO_IMG from "../../assets/hero-img.png";

const Hero = () => {
    return (
      <> 
        <div>
          <span>AI-Powered Publishing</span>
        </div>
        <h1>
          Create Stunning <span>Ebooks in Minutes</span>
        </h1>
      </>
    );
  };