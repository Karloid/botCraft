package botCraft

import "github.com/karloid/botCraft/pb"

func objCopy(position *pb.Point2D) pb.Point2D {
	return pb.Point2D{
		X: position.X,
		Y: position.Y,
	}
}
