# Setup Guide

## Quick Start

1. **Install Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **Clone and Setup**
   ```bash
   git clone https://github.com/ashikbro/smart-recipe-buddy.git
   cd smart-recipe-buddy
   npm install
   ```

4. **Configure API Key**
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key to `.env`

5. **Run the App**
   ```bash
   npm start
   ```

## Detailed Setup Instructions

### Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the key and save it securely
6. Add it to your `.env` file

**Important**: Never commit your API key to version control!

### Running on iOS (Mac only)

1. Install Xcode from the Mac App Store
2. Install iOS Simulator via Xcode
3. Run `npm start`
4. Press `i` to open in iOS Simulator

### Running on Android

1. Install [Android Studio](https://developer.android.com/studio)
2. Set up an Android Virtual Device (AVD)
3. Run `npm start`
4. Press `a` to open in Android Emulator

### Running on Physical Device

1. Install Expo Go app from App Store or Google Play
2. Run `npm start`
3. Scan the QR code with your device camera
4. The app will open in Expo Go

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules
npm install
```

### "Metro bundler issues"
```bash
npm start --clear
```

### "TensorFlow initialization failed"
- This is expected in development
- The app uses a simulated recognition for demo purposes
- For production, integrate a trained TensorFlow model

### "OpenAI API errors"
- Verify your API key is correct in `.env`
- Check your OpenAI account has credits
- Ensure you're connected to the internet

## Development Tips

### Hot Reloading
- Changes to code will automatically refresh the app
- Shake your device to open the developer menu

### Debugging
- Press `j` in terminal to open debugger
- Use React Developer Tools
- Check logs with `console.log()`

### Testing Recipe Generation
If you don't have an OpenAI API key yet, you can:
1. Sign up for a free trial at OpenAI
2. Use the demo mode (modify RecipeService.ts to return mock data)

## Production Build

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

### Web
```bash
expo build:web
```

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
