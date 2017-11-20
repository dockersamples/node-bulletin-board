CREATE DATABASE BulletinBoard;
GO

USE BulletinBoard;

CREATE TABLE Events (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Title NVARCHAR(50),
  Detail NVARCHAR(200),
  [Date] DATETIMEOFFSET,
  CreatedAt DATETIMEOFFSET NOT NULL, 
  UpdatedAt DATETIMEOFFSET NOT NULL
);

INSERT INTO Events (Title, Detail, [Date], CreatedAt, UpdatedAt) VALUES
(N'Docker for Beginners', N'Introduction to Docker using Node.js', '2017-11-21', GETDATE(), GETDATE()),
(N'Advanced Orchestration', N'Deep dive into Docker Swarm', '2017-12-25', GETDATE(), GETDATE()),
(N'Docker on Windows', N'From 101 to production', '2018-01-01', GETDATE(), GETDATE());

SELECT * FROM BulletinBoard.dbo.Events;