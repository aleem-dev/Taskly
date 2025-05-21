Expo EAS workflow

https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&platform=ios&device=simulated

Either or link which ever matches the workflow.

https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=development-build

Very Important => on above link In environment setup select iOS Simulator, and select development build then follow below steps

App create work flow

-Installed eas cli and login
	~ % npm install -g eas-cli

	-User created and login through cli
	Created user and profile on https://expo.dev/

	migizi@unos-Mac-mini ~ % eas login

-Create new app
	~ % npx create-expo-app@latest EApp01

-Move to project directory

-Generate Configuration for Build on EAS cloud
migizi@unos-Mac-mini EApp01 % eas build:configure

-Respond prompt “Would you like to … create EAS project … ? 
Write “yes”

-Select platform “Which platform …?”
Select “All”

-Edit eas.json created by above step and add iOS as per documentation on docs.expo.dev/get-started
Open project in vs code and edit the eas.json
	-https://docs.expo.dev/build/eas-json/
	-You can also configure your development builds to run on the iOS Simulator. To do this, use the following configuration for the development profile:
	{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    }
  }
}


-Build for iOS simulator on cloud
migizi@unos-Mac-mini EApp01 % eas build --platform ios --profile development

-Install expo-dev-client respond to prompt “yes”

-Observe on build process on https://expo.dev dashboard for project

-Install and run the iOS build on a simulator?
Respond to prompt “yes”

-Start Metro server
migizi@unos-Mac-mini EApp01 % npx expo start

-Choose your device
Press “i” fro iOS simulator

-To stop working
Press control + c

-To start working do following two steps after going to project directory
#start metro server
migizi@unos-Mac-mini EApp01 % npx expo start

#select your device
Press “i” fro iOS simulator
