# Contributing to Smart Recipe Buddy

Thank you for your interest in contributing to Smart Recipe Buddy! This document provides guidelines for contributing to the project.

## Code of Conduct

Please be respectful and constructive in all interactions with the project community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, device, Node version)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:
- A clear description of the feature
- The problem it solves
- Potential implementation approach
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/ashikbro/smart-recipe-buddy.git
   cd smart-recipe-buddy
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Add comments for complex logic
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm start
   # Test on iOS and Android if possible
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: description"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow React Native best practices
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names

### File Organization

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── services/       # API and external service integrations
├── utils/          # Utility functions and helpers
└── types/          # TypeScript type definitions
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HomeScreen.tsx`)
- **Services**: PascalCase (e.g., `RecipeService.ts`)
- **Utilities**: PascalCase (e.g., `CalorieCalculator.ts`)
- **Variables**: camelCase (e.g., `userName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_KEY`)

### TypeScript Guidelines

- Define types for all props and state
- Use interfaces for object types
- Avoid using `any` type
- Export types that are used in multiple files

### Component Guidelines

```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyComponent;
```

### Service Guidelines

- Keep services focused on a single responsibility
- Handle errors gracefully
- Provide clear error messages
- Document public methods

### Testing

Currently, the project doesn't have automated tests, but we welcome contributions to add:
- Unit tests for utilities and services
- Component tests
- Integration tests
- E2E tests

### Documentation

- Update README.md for user-facing changes
- Update API.md for API changes
- Add inline comments for complex logic
- Update SETUP.md for setup changes

## Feature Development

### Adding New Screens

1. Create screen component in `src/screens/`
2. Add navigation route in `App.tsx`
3. Follow existing screen patterns
4. Add proper TypeScript types

### Adding New Services

1. Create service in `src/services/`
2. Export as singleton if stateless
3. Add error handling
4. Document in API.md

### Adding New Components

1. Create component in `src/components/`
2. Make it reusable and configurable
3. Add proper prop types
4. Follow styling patterns

## API Integration

### Adding New API Integrations

1. Store API keys in `.env`
2. Never commit API keys
3. Add configuration to `.env.example`
4. Document in API.md

### OpenAI Integration

- Keep prompts clear and specific
- Handle rate limits
- Provide fallback behavior
- Test with various inputs

### TensorFlow Integration

- Optimize model size for mobile
- Test on various devices
- Provide loading states
- Handle initialization errors

## Performance

- Minimize re-renders
- Use React.memo for expensive components
- Optimize images
- Lazy load when appropriate
- Profile performance with React DevTools

## Accessibility

- Add accessibility labels
- Support screen readers
- Use appropriate contrast ratios
- Test with accessibility tools

## Security

- Never commit sensitive data
- Validate all user inputs
- Use HTTPS for all requests
- Follow OWASP mobile security guidelines

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG (if exists)
3. Test on iOS and Android
4. Create release branch
5. Tag release
6. Build and deploy

## Questions?

If you have questions about contributing, please:
1. Check existing documentation
2. Search closed issues
3. Open a new issue with your question

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Smart Recipe Buddy! 🎉
