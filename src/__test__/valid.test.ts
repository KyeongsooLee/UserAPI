import { validRegister } from '../middlewares/valid';
import { Request, Response, NextFunction } from 'express';

describe('validRegister middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    next = jest.fn();
  });

  test('should call next when userName and password are valid', () => {
    // Arrange
    req.body = {
      userName: 'John',
      password: 'test123'
    };

    // Act
    validRegister(req, res, next);

    // Assert
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should return 400 with error message when userName is missing', () => {
    // Arrange
    req.body = {
      password: 'test123'
    };

    // Act
    validRegister(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: ['Please add your name.'] });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 with error message when userName exceeds 20 characters', () => {
    // Arrange
    req.body = {
      userName: 'ThisIsAVeryLongUsernameWithMoreThan20Characters',
      password: 'test123'
    };

    // Act
    validRegister(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: ['Your name is up to 20 chars long.'] });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 with error message when password is less than 3 characters', () => {
    // Arrange
    req.body = {
      userName: 'John',
      password: '12'
    };

    // Act
    validRegister(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: ['Password must be at least 3 chars.'] });
    expect(next).not.toHaveBeenCalled();
  });
});
