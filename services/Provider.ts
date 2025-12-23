import { User } from "@/types/ProfileModel";


class Provider {
  static HostApi: string = "https://archismartsolution.com:5002";
  static HostSocketIO: string = "https://archismartsolution.com:5004";
  static Language: string = 'en';
  static Name: string = '';
  static Email: string = '';
  static Role: string = '';
  static Profile: User | null = null;

  static setProfile(profile: User | null) {
    this.Profile = profile;
  }
}

export default Provider;